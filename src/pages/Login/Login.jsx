import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./Login.css";

export default function App() {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) setMessage(error.message);
      setSession(data?.session ?? null);
      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoadingSession(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        setMessage(
          data.session
            ? "Account created successfully!"
            : "Check your email to confirm your account.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    setMessage("");
    const { error } = await supabase.auth.signOut();
    if (error) setMessage(error.message);
  }

  if (loadingSession) {
    return (
      <main className="page">
        <p>Loading...</p>
      </main>
    );
  }

  if (session) {
    return (
      <main className="page">
        <section className="panel">
          <div className="brand-mark">S</div>
          <h1>You're signed in!</h1>
          <p className="muted">Welcome to your dashboard.</p>
          <p className="user-email">{session.user.email}</p>
          {message && <p role="status">{message}</p>}
          <button className="primary" onClick={handleSignOut}>
            Sign out
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="panel">
        <div className="brand-mark">S</div>
        <p className="eyebrow">YOUR SPACE STARTS HERE</p>
        <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="muted">
          {mode === "login"
            ? "Sign in to continue to your account."
            : "Sign up with your email and a secure password."}
        </p>

        <div className="tabs">
          <button
            type="button"
            className={mode === "login" ? "tab active" : "tab"}
            onClick={() => {
              setMode("login");
              setMessage("");
            }}
          >
            Sign in
          </button>
          <button
            type="button"
            className={mode === "signup" ? "tab active" : "tab"}
            onClick={() => {
              setMode("signup");
              setMessage("");
            }}
          >
            Create account
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            placeholder="At least 8 characters"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {message && (
            <p className="message" role="status">
              {message}
            </p>
          )}

          <button className="primary" type="submit" disabled={busy}>
            {busy
              ? "Please wait..."
              : mode === "login"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>

        <p className="footer-note">Secured with Supabase Authentication</p>
      </section>
    </main>
  );
}

/*

npm run dev
Then follow this checklist.

Authentication test checklist
0 of 6


Open the login page
Visit http://localhost:5173.

Create a test account
Use an email address you can access and a password of at least 8 characters.

Confirm your email
If email confirmation is enabled, open the verification email and follow its link.

Sign in
Use the same credentials. The dashboard should display your email.

Refresh the page
Your authenticated session should persist.

Sign out
You should return to the login screen.
If you encounter problems:

Missing environment variables: Check the spelling in .env.local, then restart Vite.

Invalid API key: Verify that you copied the correct project's URL and publishable key.

Email not confirmed: Follow the email confirmation link or adjust the confirmation setting for local testing.

Login fails: Check the message displayed on the page and the user's status under Supabase Authentication → Users.

Verification link goes to the wrong page: Check your Site URL, allowed redirect URLs, and email templates.

9. Important security steps before deployment
This is a good starter authentication page. Before using it with real customer or business data:

Never expose a Supabase secret or service_role key in frontend code.

Enable and test Row Level Security (RLS) on every table containing application data. Authentication alone doesn't prevent one user from accessing another user's records.

Use server-side authorization for sensitive operations.

Configure your production site's URL and email redirect settings.

Add password reset, email verification handling, and appropriate login rate-limit/error handling as needed.

*/
