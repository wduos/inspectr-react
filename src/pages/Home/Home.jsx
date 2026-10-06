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

      <small className="dim center opaque">
        Desenvolvido por{" "}
        <a
          className="link"
          href="https://github.com/wduos/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wendel Duarte
        </a>
      </small>
    </div>
  );
}
