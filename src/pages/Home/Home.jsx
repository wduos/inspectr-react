import "./Home.css";
import inspectrLogo from "../../assets/graphics/logo-v2.svg";
import HomeButton from "../../components/HomeButton/HomeButton";

export default function Home() {
  const pageList = [
    {
      titleTop: "Conferência de",
      titleBottom: "Inbound",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M284-1.3c-17.3-10-38.7-10-56 0L143.8 47.3c-17.3 10-28 28.5-28 48.5l0 101.9-88.3 51c-17.3 10-28 28.5-28 48.5l0 97.3c0 20 10.7 38.5 28 48.5l84.3 48.6c17.3 10 38.7 10 56 0l88.3-51 88.3 51c17.3 10 38.7 10 56 0L484.5 443c17.3-10 28-28.5 28-48.5l0-97.3c0-20-10.7-38.5-28-48.5l-88.3-51 0-101.9c0-20-10.7-38.5-28-48.5L284-1.3zM232 292.6l0 106.5-88.3 51c-1.2 .7-2.6 1.1-4 1.1l0-105.3 92.3-53.3zm231.4 .6c.7 1.2 1.1 2.6 1.1 4l0 97.3c0 2.9-1.5 5.5-4 6.9l-84.3 48.6c-1.2 .7-2.6 1.1-4 1.1l0-105.3 91.2-52.6zM348.3 95.8l0 101.9-92.3 53.3 0-106.5 91.2-52.6c.7 1.2 1.1 2.6 1.1 4z" />
        </svg>
      ),
      description:
        "Escaneie e garanta que cada pallet conferido contenha apenas uma SKU.",
      url: "/compare-sku",
    },
    {
      titleTop: "Conferência de",
      titleBottom: "Outbound",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64l3.3 0c10.4 36.9 44.4 64 84.7 64s74.2-27.1 84.7-64l102.6 0c10.4 36.9 44.4 64 84.7 64s74.2-27.1 84.7-64l3.3 0c35.3 0 64-28.7 64-64l0-146.7c0-17-6.7-33.3-18.7-45.3L512 146.7c-12-12-28.3-18.7-45.3-18.7l-50.7 0 0-32c0-35.3-28.7-64-64-64L64 32zM512 237.3l0 50.7-96 0 0-96 50.7 0 45.3 45.3zM152 384a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm232 40a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM305 225l-72 72c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-102.1 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l102.1 0-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9z" />
        </svg>
      ),
      description:
        "Identifique as SKUs presentes no pallet e contabilize o número de caixas.",
      url: "/list-sku",
    },
  ];

  return (
    <div className="Home">
      <header>
        <img src={inspectrLogo} alt="Logo inspectr" />
      </header>

      <section className="item-list">
        {pageList.map((page, index) => (
          <HomeButton
            key={index}
            titleTop={page.titleTop}
            titleBottom={page.titleBottom}
            icon={page.svg}
            description={page.description}
            url={page.url}
          />
        ))}
      </section>

      <small className="center opaque">
        <a
          href="https://github.com/wduos/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            id="Layer_1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
          >
            <path d="m18.5 1h-13c-3.033 0-5.5 2.467-5.5 5.5v11c0 3.032 2.468 5.5 5.5 5.5h13c3.032 0 5.5-2.468 5.5-5.5v-11c0-3.033-2.468-5.5-5.5-5.5zm-9 2c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm16.5 14.5c0 1.379-1.121 2.5-2.5 2.5h-13c-1.379 0-2.5-1.121-2.5-2.5v-9.5h18zm-14.176-1.489c-.539-.537-.824-1.225-.824-1.956s.285-1.419.803-1.936l1.68-1.68c.586-.586 1.535-.586 2.121 0s.586 1.535 0 2.121l-1.49 1.49 1.425 1.367c.599.573.618 1.522.044 2.12-.573.599-1.525.617-2.12.044l-1.638-1.571zm6.572-3.45c-.586-.586-.586-1.535 0-2.121s1.535-.586 2.121 0l1.681 1.681c.517.516.802 1.203.802 1.935s-.285 1.419-.803 1.936l-1.659 1.592c-.595.573-1.548.555-2.12-.044-.574-.598-.555-1.547.044-2.12l1.425-1.367-1.49-1.49z" />
          </svg>
        </a>
      </small>
    </div>
  );
}
