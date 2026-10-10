import "./Home.css";
import inspectrLogo from "../../assets/graphics/logo-v2.svg";
import HomeButton from "../../components/HomeButton/HomeButton";

export default function Home() {
  const pageList = [
    {
      name: "Compara SKU",
      svg: (
        <svg viewBox="0 0 24 24">
          <path d="M18.581,2.14,12.316.051a1,1,0,0,0-.632,0L5.419,2.14A4.993,4.993,0,0,0,2,6.883V12c0,7.563,9.2,11.74,9.594,11.914a1,1,0,0,0,.812,0C12.8,23.74,22,19.563,22,12V6.883A4.993,4.993,0,0,0,18.581,2.14ZM16.718,9.717l-4.272,4.272a1.873,1.873,0,0,1-1.335.553h-.033a1.872,1.872,0,0,1-1.345-.6l-2.306-2.4A1,1,0,1,1,8.868,10.16L11.112,12.5,15.3,8.3a1,1,0,0,1,1.414,1.414Z" />
        </svg>
      ),
      description:
        "Escaneie e garanta que cada pallet conferido contenha apenas uma SKU.",
      url: "/compare-sku",
    },
    {
      name: "Lista SKU",
      svg: (
        <svg viewBox="0 0 24 24">
          <path d="m18 12c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm2.5 7h-1.5v1.5c0 .553-.447 1-1 1s-1-.447-1-1v-1.5h-1.5c-.553 0-1-.447-1-1s.447-1 1-1h1.5v-1.5c0-.553.447-1 1-1s1 .447 1 1v1.5h1.5c.553 0 1 .447 1 1s-.447 1-1 1zm-19.245-14.565c.232-.22.489-.417.773-.579l5.808-3.288s0 0 0 0c.656-.371 1.4-.568 2.151-.568h.004c.753 0 1.497.195 2.152.565l5.824 3.291c.287.162.545.36.778.581l-8.743 4.997zm7.736 17.18c-.33-.087-.652-.217-.954-.39l-6.021-3.442c-1.243-.71-2.016-2.041-2.016-3.473v-6.973c0-.415.072-.819.194-1.205l8.805 5.032c0 1.149-.005 6.886-.008 10.451zm2.009-7.48c.001-1.406.002-2.523.002-2.966l8.804-5.033c.122.385.194.789.194 1.203v2.923c-.64-.165-1.308-.262-2-.262-3.016 0-5.637 1.67-7 4.135z" />
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
            title={page.name}
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
