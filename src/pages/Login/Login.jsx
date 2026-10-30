import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/Header/Header";
import "./Login.css";

export default function Login() {
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

  useEffect(() => {
    if (session?.user?.email) {
      localStorage.setItem("userMail", session.user.email);

      window.location.href = "/";
    } else {
      localStorage.removeItem("userMail");
    }
  }, [session]);

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
            ? "Conta criada com sucesso!"
            : "Confirme sua conta pelo email enviado.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error) {
      setMessage(error.message || "Erro inesperado.");
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

  return (
    <>
      <Header pageTitle="Entrar" showLoginBtn={false} />

      <main className="Login">
        <section className="panel">
          <h1>{mode === "login" ? "Olá, novamente!" : "Crie sua conta"}</h1>
          <p>
            {mode === "login"
              ? "Faça login para acessar sua conta."
              : "Utilize seu email e senha empresarial."}
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
              Entrar
            </button>
            <button
              type="button"
              className={mode === "signup" ? "tab active" : "tab"}
              onClick={() => {
                setMode("signup");
                setMessage("");
              }}
            >
              Criar conta
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="joao.souza@dsv.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              placeholder="********"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {message && (
              <p className="message mtop" role="status">
                {message}
              </p>
            )}

            <button className="button mtop" type="submit" disabled={busy}>
              {busy
                ? "Aguarde..."
                : mode === "login"
                  ? "Entrar"
                  : "Criar conta"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

/*

Never expose a Supabase secret or service_role key in frontend code.

Enable and test Row Level Security (RLS) on every table containing application data. Authentication alone doesn't prevent one user from accessing another user's records.

Configure your production site's URL and email redirect settings.

Add password reset, email verification handling, toggle password visibility button, and appropriate login rate-limit/error handling as needed.

*/
