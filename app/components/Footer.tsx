// components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">&copy; {year} Fakhreddine. All rights reserved.</p>

        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            LinkedIn
          </a>
          <a href="mailto:youremail@example.com" className="hover:text-blue-500">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}