export default function Header() {
  return (
    <div className="flex justify-between items-center py-4">
      <div>LXNA</div>
      <div>
        <ul className="flex gap-4 font-sans text-sm uppercase tracking-widest">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>icon</div>
    </div>
  );
}
