
import './Doc_Info.css';
import Button from '../../Button/Button';

export interface DocData {
    id: number;
    file_name: string;
    file_url: string;
    ocr_name: string;
    ocr_date: string;
    ocr_sum: string;
    created_at: string;
}

interface DocInfoProps {
    data: DocData;
    onDelete: (id: number) => void;
}

function Doc_Info({ data, onDelete }: DocInfoProps) {
  return (
    <div className='doc-info'>
        <div className='doc-details'>
            <span className='doc-name'>{data.file_name} ({data.ocr_name})  </span>
            <span className='doc-time'>Загружено: {data.created_at}  </span>
            <span className='doc-time'>Дата в док-те: {data.ocr_date}  </span>
            <span className='doc-time'>Сумма: {data.ocr_sum}  </span>
        </div>
        <Button
            name={"Delete"}
            onclick={() => onDelete(data.id)}
        />
    </div>
  );
};

export default Doc_Info;