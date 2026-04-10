import { ArrowDownRight, MoveDownRight } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex p-3">
      <div className="bg-onyx p-1">
        <ArrowDownRight className="text-alabaster" />
      </div>
    </div>
  );
}
