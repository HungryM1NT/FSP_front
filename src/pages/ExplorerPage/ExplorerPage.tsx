import { useState } from 'react';
import './ExplorerPage.css';
import Navbar from '../../components/Navbar/Navbar';
import FileSys from '../../components/FileSys/FileSys';
import api from '../../api/axios';

function ExplorerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    try {
        await api.post("/upload", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        setRefreshKey(prev => prev + 1);
    } catch (error) {
        console.error("Ошибка при загрузке:", error);
        alert("Не удалось загрузить и обработать файл.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className='explorer_container'>
      <Navbar onUpload={handleFileUpload} />
      
      <FileSys key={refreshKey} />

      {isLoading && (
        <div className="upload_overlay">
            <div className="upload_message">
                Обрабатываю документ через EasyOCR, подождите...
            </div>
        </div>
      )}
    </div>
  );
}

export default ExplorerPage;