import './ExplorerPage.css';
import Navbar from '../../components/Navbar/Navbar';
import FileSys from '../../components/FileSys/FileSys';

function ExplorerPage() {
  return (
    <div className='explorer_container'>
      <Navbar />
      <FileSys />
    </div>
  );
}

export default ExplorerPage;
