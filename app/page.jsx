import PageContent from "./components/PageContent/PageContent";

export default async function Home() {
    const req = await fetch(`${process.env.NEXT_BASE_URL}/api/datalist`);
    const res = await req.json();
    return (
        <PageContent {...res}>
        </PageContent>
    )
}