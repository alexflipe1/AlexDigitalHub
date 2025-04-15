import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Alex. Todos os direitos reservados.
            </p>
          </div>
          <div className="mt-4 flex justify-center md:mt-0 space-x-6">
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Sobre</span>
              <span className="text-sm">Sobre</span>
            </Link>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Contato</span>
              <span className="text-sm">Contato</span>
            </Link>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Termos</span>
              <span className="text-sm">Termos</span>
            </Link>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Privacidade</span>
              <span className="text-sm">Privacidade</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
