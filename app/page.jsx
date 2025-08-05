import PageContent from "./components/PageContent/PageContent";
import { getDataList } from "@/lib/pokemon";

export default async function Home() {
    const res = await getDataList()
    return (
        <PageContent {...res}>
        </PageContent>
    )
}