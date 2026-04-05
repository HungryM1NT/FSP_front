import React, { useEffect, useState } from 'react';
import './DocumentModal.css';

interface DocumentItem {
  id: number;
  file_name: string;
  file_url: string;
  ocr_name: string;
  ocr_date: string;
  ocr_sum: string;
  created_at: string;
}

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DocumentItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
  onDelete: (docId: number) => Promise<void>;
  onUpdate: (docId: number, updatedData: { file_name: string; ocr_name: string; ocr_date: string; ocr_sum: string }) => Promise<void>;
}


const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  documents,
  currentIndex,
  onNavigate,
  onDelete,
  onUpdate
}) => {
  const [editData, setEditData] = useState({ file_name: '', ocr_name: '', ocr_date: '', ocr_sum: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && documents[currentIndex]) {
      setEditData({
        file_name: documents[currentIndex].file_name,
        ocr_name: documents[currentIndex].ocr_name,
        ocr_date: documents[currentIndex].ocr_date,
        ocr_sum: documents[currentIndex].ocr_sum
      });
    }
  }, [isOpen, currentIndex, documents]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
          if (e.key === 'Escape') onClose();
          return;
      }
      
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, documents.length]);

  if (!isOpen || documents.length === 0) return null;

  const currentDoc = documents[currentIndex];

  const handlePrev = () => {
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : documents.length - 1;
    onNavigate(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < documents.length - 1 ? currentIndex + 1 : 0;
    onNavigate(nextIndex);
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Вы уверены, что хотите удалить файл "${currentDoc.file_name}"?`)) {
      onDelete(currentDoc.id);
    }
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    await onUpdate(currentDoc.id, editData);
    setIsSaving(false);
  };

  const hasChanges = 
    editData.file_name !== currentDoc.file_name ||
    editData.ocr_name !== currentDoc.ocr_name ||
    editData.ocr_date !== currentDoc.ocr_date ||
    editData.ocr_sum !== currentDoc.ocr_sum;

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <button className="close_btn" onClick={onClose}>×</button>

        <div className="modal_image_section">
          {currentDoc.file_name.toLowerCase().endsWith('.pdf') ? (
            <iframe 
              src={currentDoc.file_url} 
              title={currentDoc.file_name} 
              className="doc_photo"
              style={{ width: '100%', height: '100%', border: 'none', backgroundColor: 'white' }}
            />
          ) : (
            <img src={currentDoc.file_url} alt={currentDoc.file_name} className="doc_photo" />
          )}
          
          <button className="nav_btn prev_btn" onClick={handlePrev}>‹</button>
          <button className="nav_btn next_btn" onClick={handleNext}>›</button>
        </div>

        <div className="modal_data_section">
          <h3>Детали документа</h3>
          
          <div className="data_field">
            <label>Имя Файла (Системное):</label>
            <input 
              type="text" 
              value={editData.file_name} 
              onChange={e => setEditData({...editData, file_name: e.target.value})} 
            />
          </div>

          <div className="data_field">
            <label>Тип документа / Компания:</label>
            <input 
              type="text" 
              value={editData.ocr_name} 
              onChange={e => setEditData({...editData, ocr_name: e.target.value})} 
            />
          </div>

          <div className="data_field">
            <label>Дата:</label>
            <input 
              type="text" 
              value={editData.ocr_date} 
              onChange={e => setEditData({...editData, ocr_date: e.target.value})} 
            />
          </div>

          <div className="data_field">
            <label>Сумма:</label>
            <input 
              type="text" 
              value={editData.ocr_sum} 
              onChange={e => setEditData({...editData, ocr_sum: e.target.value})} 
            />
          </div>

          <div className="data_field">
            <label>Дата Загрузки:</label>
            <input type="text" value={currentDoc.created_at} readOnly style={{backgroundColor: '#e9ecef'}} />
          </div>

          <div className="modal_actions" style={{ gap: '10px' }}>
            <button className="delete_doc_btn" onClick={handleDeleteClick}>
              Удалить
            </button>
            <button 
              className="save_doc_btn" 
              onClick={handleSaveClick}
              disabled={!hasChanges || isSaving}
              style={{
                backgroundColor: hasChanges ? '#28a745' : '#ccc',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '6px',
                cursor: hasChanges ? 'pointer' : 'not-allowed',
                fontWeight: 500,
              }}
            >
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;