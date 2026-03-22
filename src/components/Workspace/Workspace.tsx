import React from 'react';
import './Workspace.css';
import Doc from './Doc/Doc';
import Controls from './Controls/Controls';
import Doc_Info, { DocData } from './Doc_Info/Doc_Info';

interface WorkspaceProps {
    documentData: DocData | null;
    onDelete: (id: number) => void;
}

function Workspace({ documentData, onDelete }: WorkspaceProps) {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
      return <div className='workspace-empty'>Пожалуйста, войдите в систему для работы с документами.</div>;
  }

  if (!documentData) {
      return <div className='workspace-empty'>Выберите файл для загрузки...</div>;
  }

  return (
    <div className='workspace'>
        <Doc_Info data={documentData} onDelete={onDelete}/>
        <Doc imageUrl={documentData.file_url}/>
        <Controls/>
    </div>
  );
};

export default Workspace;