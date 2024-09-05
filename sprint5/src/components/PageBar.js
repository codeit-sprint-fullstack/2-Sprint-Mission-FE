import prevPage from '../images/status=active@2x.png';
import nextPage from '../images/status=active@2x-1.png';
import '../css/PageBar.css';

export default function PageBar() {
  return (
    <div className="page-number">
      <button>
        <img src={prevPage} />
      </button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>
        <img src={nextPage} />
      </button>
    </div>
  );
}
