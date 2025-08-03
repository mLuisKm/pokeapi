import "./globals.css";

export const metadata = {
  title: "PokeApi",
  description: "An app to search pokemons an pokemon's abilities through the public pokeapi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
