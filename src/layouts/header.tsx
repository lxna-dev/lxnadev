export default function Header() {
  return (
    <div className="flex items-center justify-between py-4 font-sans">
      <div>LXNA</div>
      <div>
        <ul className="flex gap-4 text-sm tracking-widest uppercase">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>icon</div>
    </div>
  );
}
