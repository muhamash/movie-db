export const metadata = {
  title: "MovieDB -> Comparison Page",
  description: "Dynamic Parallel Routes for Slots",
};

export default async function ComparisonRootLayout({
    children,
    slotId,
}) {
    return (
        <div className="container mx-auto px-4 pt-24 pb-8">
            { children }
            <div className="grid gap-6 md:grid-cols-2">
                {slotId}
            </div>
        </div>
    );
};