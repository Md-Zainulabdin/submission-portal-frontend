import { LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

export function SiteFooter() {
  return (
    <footer className="py-6 px-16 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-md leading-loose text-muted-foreground md:text-left">
          Built with <span className="text-red-600">❤</span> by Zain-ul-Abdin
        </p>
        <div className="space-x-6 flex items-center">
          <a href={"https://twitter.com/_md_zainulabdin"} target="_blank">
            <TwitterLogoIcon className="w-5 h-5 text-muted-foreground" />
          </a>
          <a
            href={"https://www.linkedin.com/in/m-zain-ul-abdin/"}
            target="_blank "
          >
            <LinkedInLogoIcon className="w-5 h-5 text-muted-foreground" />
          </a>
        </div>
      </div>
    </footer>
  );
}
