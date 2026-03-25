import { useState, useEffect, useMemo } from 'react';
import './FileSys.css';
import api from '../../api/axios';
import DocumentModal from '../DocumentModal/DocumentModal';

interface DocumentItem {
  id: number;
  file_name: string;
  file_url: string;
  ocr_name: string;
  ocr_date: string;
  ocr_sum: string;
  created_at: string;
}

type SortField = 'created_at' | 'file_name' | 'ocr_sum';
type SortOrder = 'asc' | 'desc';

function FileSys() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [uploadDateFrom, setUploadDateFrom] = useState('');
  const [uploadDateTo, setUploadDateTo] = useState('');
  const [ocrDateFrom, setOcrDateFrom] = useState('');
  const [ocrDateTo, setOcrDateTo] = useState('');

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке файлов:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);


  const availableTypes = useMemo(() => {
    const types = new Set(documents.map(doc => doc.ocr_name));
    return Array.from(types);
  }, [documents]);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const processedDocuments = useMemo(() => {
    let result = documents.filter(doc => {

      const matchSearch = doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.ocr_name.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchSearch) return false;


      if (selectedTypes.length > 0 && !selectedTypes.includes(doc.ocr_name)) {
        return false;
      }

      if (uploadDateFrom || uploadDateTo) {
        const dateParts = doc.created_at.split(' ')[1];
        if (dateParts) {
          const [d, m, y] = dateParts.split('.');
          const docUploadDate = new Date(`${y}-${m}-${d}T00:00:00`);
          if (uploadDateFrom && docUploadDate < new Date(uploadDateFrom)) return false;
          if (uploadDateTo && docUploadDate > new Date(uploadDateTo)) return false;
        }
      }


      if (ocrDateFrom || ocrDateTo) {
        if (!doc.ocr_date || doc.ocr_date === "Не найдено") return false; 
        const [d, m, y] = doc.ocr_date.split('/');
        if (d && m && y) {
          const docOcrDate = new Date(`${y}-${m}-${d}T00:00:00`);
          if (ocrDateFrom && docOcrDate < new Date(ocrDateFrom)) return false;
          if (ocrDateTo && docOcrDate > new Date(ocrDateTo)) return false;
        }
      }

      return true;
    });

    result.sort((a, b) => {
      let valA: string | number = 0;
      let valB: string | number = 0;

      if (sortBy === 'file_name') {
        valA = a.file_name.toLowerCase();
        valB = b.file_name.toLowerCase();
        return sortOrder === 'asc' ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
      } 
      
      if (sortBy === 'ocr_sum') {
        const parseSum = (sumStr: string) => {
          if (!sumStr || sumStr === "Не найдено") return 0;
          return parseFloat(sumStr.replace(/,/g, '')) || 0;
        };
        valA = parseSum(a.ocr_sum);
        valB = parseSum(b.ocr_sum);
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      } 
      
      if (sortBy === 'created_at') {
        const parseDate = (dateStr: string) => {
          try {
            const [time, date] = dateStr.split(' ');
            const [hours, minutes] = time.split(':');
            const [day, month, year] = date.split('.');
            return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes)).getTime();
          } catch (e) {
            return 0;
          }
        };
        valA = parseDate(a.created_at);
        valB = parseDate(b.created_at);
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }

      return 0;
    });

    return result;
  }, [documents, searchTerm, sortBy, sortOrder, selectedTypes, uploadDateFrom, uploadDateTo, ocrDateFrom, ocrDateTo]);

  const handleDoubleClick = (index: number) => {
    setCurrentViewIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteDocument = async (docId: number) => {
    try {
        await api.delete(`/documents/${docId}`);
        setIsModalOpen(false);
        fetchDocuments();
    } catch (error) {
        console.error("Ошибка при удалении:", error);
        alert("Не удалось удалить документ.");
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTypes([]);
    setUploadDateFrom('');
    setUploadDateTo('');
    setOcrDateFrom('');
    setOcrDateTo('');
  };

  return (
    <div className='filesys'>
      <div className="filesys_header_container">
        <div className="filesys_header">
          <h2>Мои документы</h2>

          <div className="header_controls">
              <input 
                  type="text" 
                  placeholder="Поиск..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search_input_compact"
              />
              
              <button 
                className={`filter_toggle_btn ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                Фильтры
              </button>

              <div className="sort_controls_compact">
                  <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value as SortField)}
                      className="sort_select_compact"
                  >
                      <option value="created_at">По дате</option>
                      <option value="file_name">По имени</option>
                      <option value="ocr_sum">По сумме</option>
                  </select>

                  <button 
                      className="sort_order_btn_compact"
                      onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                      title={sortOrder === 'asc' ? 'Сортировка по возрастанию' : 'Сортировка по убыванию'}
                  >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
              </div>
          </div>
        </div>

        {showFilters && (
          <div className="advanced_filters_panel">
            <div className="filter_group">
              <h4>Тип документа (OCR)</h4>
              <div className="checkbox_group">
                {availableTypes.map(type => (
                  <label key={type} className="checkbox_label">
                    <input 
                      type="checkbox" 
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter_group">
              <h4>Дата загрузки в систему</h4>
              <div className="date_inputs">
                <label>От: <input type="date" value={uploadDateFrom} onChange={e => setUploadDateFrom(e.target.value)}/></label>
                <label>До: <input type="date" value={uploadDateTo} onChange={e => setUploadDateTo(e.target.value)}/></label>
              </div>
            </div>

            <div className="filter_group">
              <h4>Дата на документе (OCR)</h4>
              <div className="date_inputs">
                <label>От: <input type="date" value={ocrDateFrom} onChange={e => setOcrDateFrom(e.target.value)}/></label>
                <label>До: <input type="date" value={ocrDateTo} onChange={e => setOcrDateTo(e.target.value)}/></label>
              </div>
            </div>

            <div className="filter_actions">
              <button className="clear_filters_btn" onClick={clearFilters}>Сбросить все</button>
            </div>
          </div>
        )}
      </div>
      
      <div className="filesys_content">
        {isLoading ? (
          <p className="loading_text">Загрузка файлов...</p>
        ) : processedDocuments.length === 0 ? (
          <p className="empty_text">Документы не найдены. Попробуйте изменить фильтры.</p>
        ) : (
          <div className="file_grid">
            {processedDocuments.map((doc, index) => (
              <div 
                key={doc.id} 
                className="file_item" 
                onDoubleClick={() => handleDoubleClick(index)}
                title={`Дата: ${doc.ocr_date}\nСумма: ${doc.ocr_sum}`}
              >
                <div className="file_icon">📄</div>
                <div className="file_name">{doc.file_name}</div>
                <div className="file_type">{doc.ocr_name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="filesys_footer">
        <span>Элементов: {processedDocuments.length}</span>
      </div>

      <DocumentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        documents={processedDocuments}
        currentIndex={currentViewIndex}
        onNavigate={setCurrentViewIndex}
        onDelete={handleDeleteDocument}
      />
    </div>
  );
}

export default FileSys;