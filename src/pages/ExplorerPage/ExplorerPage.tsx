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
        const response = await api.post("/upload", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        const taskId = response.data.task_id;

        const checkTaskStatus = async () => {
            try {
                const res = await api.get(`/tasks/${taskId}`);
                
                if (res.data.status === 'SUCCESS') {
                    setRefreshKey(prev => prev + 1);
                    setIsLoading(false);
                } else if (res.data.status === 'FAILURE') {
                    alert("Произошла ошибка при распознавании документа.");
                    setIsLoading(false);
                } else {
                    setTimeout(checkTaskStatus, 2000);
                }
            } catch (error) {
                console.error("Ошибка при проверке статуса:", error);
                setIsLoading(false);
            }
        };

        checkTaskStatus();

    } catch (error) {
        console.error("Ошибка при загрузке:", error);
        alert("Не удалось отправить файл на сервер.");
        setIsLoading(false);
    }
  };

  return (
    <div className='explorer_container'>
      <Navbar onUpload={handleFileUpload} />
      
      <FileSys key={refreshKey} />
    </div>
  );
}

export default ExplorerPage;