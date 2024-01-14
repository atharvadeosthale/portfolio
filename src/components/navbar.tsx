import ThemeToggler from "./theme-toggler";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  return (
    <div className="py-4 flex justify-between items-center">
      <div>Atharva D.</div>
      <div className="flex items-center gap-5">
        <ThemeToggler />
        <a href="https://github.com/atharvadeosthale/portfolio" target="_blank">
          <Button variant="secondary" className="flex gap-3 items-center">
            <GitHubLogoIcon />
            GitHub
          </Button>
        </a>
      </div>
    </div>
  );
}
