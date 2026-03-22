import { useState } from 'react';
import './HomePage.css';
import Navbar from '../../components/Navbar/Navbar';
import Workspace from '../../components/Workspace/Workspace';
import Menu from '../../components/Menu/Menu';
import { DocData } from '../../components/Workspace/Doc_Info/Doc_Info';
import api from '../../api/axios';

function HomePage() {
  const [documentData, setDocumentData] = useState<DocData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    try {
        const response = await api.post("/upload", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        setDocumentData(response.data);
    } catch (error) {
        console.error("Ошибка при загрузке:", error);
        alert("Не удалось загрузить и обработать файл.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleDeleteDocument = async (id: number) => {
      const confirmDelete = window.confirm("Вы уверены, что хотите удалить этот документ?");
      if (!confirmDelete) return;

      try {
          await api.delete(`/documents/${id}`);
          setDocumentData(null);
      } catch (error) {
          console.error("Ошибка при удалении:", error);
          alert("Не удалось удалить документ.");
      }
  };

  return (
    <div className="container">
      <Navbar onUpload={handleFileUpload} />
      <Menu />
      
      {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'white', fontSize: '1.2rem' }}>
              Обрабатываю документ через EasyOCR, подождите...
          </div>
      ) : (
          <Workspace documentData={documentData} onDelete={handleDeleteDocument} />
      )}
    </div>
  );
}

export default HomePage;