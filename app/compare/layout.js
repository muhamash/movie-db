export default function compareLayout({
  children,
  slots,
}) {
    return (
        <div>
            <div>{ children }</div>
            <div className="flex flex-col gap-5 bg-green-500 p-3">{ slots }</div>
        </div>
    );
}