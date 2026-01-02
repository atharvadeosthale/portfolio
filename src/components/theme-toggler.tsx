"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function ThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="w-9 h-9 flex items-center justify-center border-2 border-foreground hover:bg-foreground hover:text-background transition-colors focus:outline-none">
        {resolvedTheme === "light" ? (
          <SunIcon className="w-4 h-4" />
        ) : (
          <MoonIcon className="w-4 h-4" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-2 border-foreground bg-background rounded-none min-w-[120px]">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="font-mono text-xs uppercase tracking-wider cursor-pointer rounded-none hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="font-mono text-xs uppercase tracking-wider cursor-pointer rounded-none hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="font-mono text-xs uppercase tracking-wider cursor-pointer rounded-none hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
