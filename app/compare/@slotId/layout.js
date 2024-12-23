import AddMovie from "@/components/compare/AddMovie";

export default async function SlotIdLayout({ children }) {
  return <>
    <div className="pt-[50px] flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Compare Movies</h1>
      <AddMovie />
    </div>
    { children }
  </>;
};