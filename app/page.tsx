"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Charger la liste des fichiers au montage
  useEffect(() => {
    fetchFiles();
  }, []);

  // Fonction pour récupérer la liste des fichiers
  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files");
      const data = await response.json();
      if (data.files) {
        setFiles(data.files);
      }
    } catch (error) {
      setMessage("Erreur lors du chargement des fichiers");
    }
  };

  // Gérer la sélection du fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Gérer l'upload du fichier
  const handleUpload = async () => {
    if (!file) {
      setMessage("Veuillez sélectionner un fichier");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.message) {
        setMessage(data.message);
        setFile(null);
        fetchFiles(); // Rafraîchir la liste des fichiers
      } else {
        setMessage(data.error || "Erreur lors de l'upload");
      }
    } catch (error) {
      setMessage("Erreur lors de l'upload");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Uploader des fichiers vers S3</h1>

      {/* Formulaire d'upload */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 w-full p-2 border rounded"
        />
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className={`w-full p-2 rounded text-white ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Chargement..." : "Uploader"}
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>

      {/* Liste des fichiers */}
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Fichiers dans S3</h2>
        {files.length > 0 ? (
          <ul className="bg-white p-4 rounded-lg shadow-lg">
            {files.map((fileName) => (
              <li key={fileName} className="py-2 border-b last:border-b-0">
                {fileName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Aucun fichier trouvé</p>
        )}
      </div>
    </div>
  );
}
