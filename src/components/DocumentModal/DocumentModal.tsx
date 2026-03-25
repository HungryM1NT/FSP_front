import React, { useEffect } from 'react';
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
}

const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  documents,
  currentIndex,
  onNavigate,
  onDelete,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex]);

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

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <button className="close_btn" onClick={onClose}>×</button>

        <div className="modal_image_section">
          <img src={currentDoc.file_url} alt={currentDoc.file_name} className="doc_photo" />
          
          <button className="nav_btn prev_btn" onClick={handlePrev}>‹</button>
          <button className="nav_btn next_btn" onClick={handleNext}>›</button>
        </div>

        <div className="modal_data_section">
          <h3>Детали документа</h3>
          
          <div className="data_field">
            <label>Имя Файла:</label>
            <input type="text" value={currentDoc.file_name} readOnly />
          </div>

          <div className="data_field">
            <label>Тип документа (OCR):</label>
            <input type="text" value={currentDoc.ocr_name} readOnly />
          </div>

          <div className="data_field">
            <label>Дата (OCR):</label>
            <input type="text" value={currentDoc.ocr_date} readOnly />
          </div>

          <div className="data_field">
            <label>Сумма (OCR):</label>
            <input type="text" value={currentDoc.ocr_sum} readOnly />
          </div>

          <div className="data_field">
            <label>Дата Загрузки:</label>
            <input type="text" value={currentDoc.created_at} readOnly />
          </div>

          <div className="modal_actions">
            <button className="delete_doc_btn" onClick={handleDeleteClick}>
              Удалить документ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;