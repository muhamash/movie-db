export default async function CompareLayout({
    children,
    slotId
}) {
    return (
        <div className="container mx-auto px-4 pt-24 pb-8">
            { children }
            { slotId }
        </div>
    );
}