import React from "react";
import "./FeaturedCompanies.css";


const FeaturedCompanies = () => {
  const companies = [
    { id: 1, name: "TGC", logo: "https://www.pngkey.com/png/full/888-8885651_prizejudges-tgc-logo.png" },
    { id: 2, name: "Quess", logo: "https://tse4.mm.bing.net/th/id/OIP.Ka7SXVfYhTaT9ByqVHBWUAHaEK?pid=Api&P=0&h=220" },
    { id: 3, name: "Atos", logo: "https://tse2.mm.bing.net/th/id/OIP.8wKuEO6F2eijHlX7MS9DIAHaCx?pid=Api&P=0&h=220" },
    { id: 4, name: "BharatFIH", logo: "https://tse4.mm.bing.net/th/id/OIP.du1hIxTpBxlSOlSiG2tzlQAAAA?pid=Api&P=0&h=220" },
    { id: 5, name: "Tech Mahindra", logo: "https://tse1.mm.bing.net/th/id/OIP.rs6__RKBjvV8cOK-yjAtpgHaEs?pid=Api&P=0&w=631&h=400" },
    { id: 6, name: "TCS", logo: "https://tse1.mm.bing.net/th/id/OIP.0ctoK0ov-ThnBz04kx_f5QHaEq?pid=Api&P=0&w=636&h=400" },
    { id: 7, name: "Zensar", logo: "https://tse1.mm.bing.net/th/id/OIP.AdUsoeCBWMhEXVcL4HCdTAHaFi?pid=Api&P=0&h=220" },
    { id: 8, name: "LTIMindtree", logo: "https://tse2.mm.bing.net/th/id/OIP.XOeD9SBHVF3ABfby5-eF5QHaEU?pid=Api&P=0&h=220" },
    { id: 9, name: "ValueLabs", logo: "https://tse2.mm.bing.net/th/id/OIP.bANyZ1hTyhsOONcqIGf-wgHaD4?pid=Api&P=0&h=220" },
    { id: 10, name: "L&T", logo: "https://tse2.mm.bing.net/th/id/OIP.7GEwsYL-mharTQ2qILYcqwHaFP?pid=Api&H=113&W=160" },
    { id: 11, name: "Taggd", logo: "https://tse2.mm.bing.net/th/id/OIP.bFhhooILQTrOYVAHWTLI5AAAAA?pid=Api&H=86&W=160" },
    { id: 12, name: "Artech", logo: "https://tse1.mm.bing.net/th/id/OIP.EP3qn_sUEHiQ-n5_BGPy_gHaHa?pid=Api&H=160&W=160" },
    { id: 13, name: "Tekskills", logo: "https://tse3.mm.bing.net/th/id/OIP.IOmxlVg4V9krzKBxgvtLswAAAA?pid=Api&P=0&h=220" },
    { id: 14, name: "Infosys", logo: "https://tse1.mm.bing.net/th/id/OIP.ZlzwoB6b_VEZ63CRj4R5qgHaC9?pid=Api&P=0&h=220" },
    { id: 15, name: "Capgemini", logo: "https://tse1.mm.bing.net/th/id/OIP.uQyJmh8HoW1Mw7wg3c1ukwHaE8?pid=Api&P=0&h=220" },
    { id: 16, name: "Birlasoft", logo: "https://tse2.mm.bing.net/th/id/OIP.ibir98bnYIsg0aDOGH8x7gHaCM?pid=Api&P=0&h=220" }
  ];

  return (
    <section className="featured-section">
      <h2>Featured Companies</h2>
      <div className="slider">
        <div className="slide-track">
          {companies.concat(companies).map((company, index) => (
            <div className="slide" key={index}>
              <img src={company.logo} alt={company.name} />
              {console.log(company.logo)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
