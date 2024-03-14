import { useState } from 'react'
import "../App.css"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./OrderPage.css";
import logo from "../Assets/mile1-assets/logo.svg"

const customButtonStyle = {
  marginTop: '1rem',
  display: 'inline-block',
  padding: '10px 40px',
  borderRadius: '20px',
  backgroundColor: '#fdc913',
  color: 'black',
  textDecoration: 'none',
  fontSize: 'large',
};
function OrderPage() {
  

  const [name, setName] = useState('');
  const [toppings, setToppings] = useState([]);
  const [size, setSize] = useState('');
  const [thickness, setThickness] = useState('');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [toppingsPrice,setToppingsPrice]=useState(0);
  const basePrice = 85.50;
  const [errors, setErrors] = useState({
    name: '',
    toppings: '',
    size: '',
    thickness: ''
  });

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    updateTotalPrice(newQuantity);
  };

  const updateTotalPrice = (quantity) => { 
    const toppingPrice = 5; 
    const sizePriceMap = {
      small: 85.50,
      medium: 100.50,
      large: 110.50,
    };
    const sizePrice = sizePriceMap[size] || 0;
    const toppingsPrice = toppings.length * toppingPrice;
    setToppingsPrice(toppingsPrice)
    const totalPrice = (sizePrice + toppingsPrice) * quantity;
    setTotalPrice(totalPrice);
  };
  
  const history=useHistory();

  const handleSubmit = () => {
    let valid = true;

    
    if (name.length < 3) {
      setErrors(prevErrors => ({
        ...prevErrors,
        name: "Adınızı en az 3 karakter giriniz."
      }));
      valid = false;
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        name: ""
      }));
    }

   
    if ( toppings.length > 10) {
      setErrors(prevErrors => ({
        ...prevErrors,
        toppings: "En fazla 10 adet seçim yapabilirsiniz."
      }));
      valid = false;
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        toppings: ""
      }));
    }

    
    if (!size) {
      setErrors(prevErrors => ({
        ...prevErrors,
        size: "Lütfen bir boyut seçiniz."
      }));
      valid = false;
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        size: ""
      }));
    }

    
    if (!thickness) {
      setErrors(prevErrors => ({
        ...prevErrors,
        thickness: "Lütfen bir hamur kalınlığı seçiniz."
      }));
      valid = false;
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        thickness: ""
      }));
    }

    if (valid) {
      const orderData = {
        name: name,
        toppings: toppings,
        thickness:thickness,
        size: size,
        notes: notes,
        quantity: quantity
      };
  
      axios.post('https://reqres.in/api/pizza', orderData)
        .then(response => {
          console.log('Sunucu yanıtı:', response.data);
          console.log('İsim:', response.data.name);
          console.log('Ek Malzemeler:', response.data.toppings.join(', '));
          console.log('Boyut Seç:', response.data.size);
          console.log('Hamur Seç:', response.data.thickness);
          console.log('Notlar:', response.data.notes);
          console.log('Sipariş Tarihi:', response.data.createdAt);
          console.log('Adet:', response.data.quantity);
          console.log('Toplam Fiyat:', response.data.totalPrice);
          history.push("/SuccesPage");
        })
        .catch(error => {
          console.error('Sipariş gönderilirken bir hata oluştu:', error);
        });
    }
  };

  return (
    <div className="card-container">
      <header >
      <img  src={logo}/>
        <p>Anasayfa-Sipariş oluştur</p>
      </header>
      <div className="metin-container">
      
        <h2>Position Absolute Acı Pizza</h2>
        <p className="tutar"> {basePrice} TL</p>
        <p className="paragraf">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, quis blanditiis vero dolores quibusdam perspiciatis quisquam amet. Numquam hic ab ducimus quam laudantium dolores perspiciatis quis asperiores eaque modi fugit ad vero quo, quasi placeat, aliquid quidem nulla! Maiores, quae nobis? Vero possimus consequuntur nihil natus voluptatem quod. Eos laudantium at ipsa consequuntur amet blanditiis, vel ea debitis dolorem iste! At quasi aperiam nesciunt iusto eius explicabo molestias cupiditate, animi nemo debitis molestiae eligendi dolore hic mollitia accusamus. Accusantium, tempora ut iste illum consectetur culpa dolores cum officia magnam at. Deleniti, excepturi voluptates? Eaque aliquid adipisci mollitia, quam cupiditate cum?</p>
      
        <form>
          <FormGroup tag="fieldset">
            <legend>Boyut Seç</legend>
            <FormGroup check>
              <Input
              id="size"
              data-cy="size"
                name="size"
                type="radio"
                value="small"
                checked={size === 'small'}
                onChange={() => setSize('small')} 
              />
              <Label check>Küçük</Label>
            </FormGroup>
            <FormGroup check>
              <Input
                name="size"
                data-cy="size"
                type="radio"
                value="medium"
                checked={size === 'medium'}
                onChange={() => setSize('medium')} 
              />
              <Label check>Orta</Label>
            </FormGroup>
            <FormGroup check>
              <Input
                name="size"
                type="radio"
                value="large"
                checked={size === 'large'}
                onChange={() => setSize('large')} 
              />
              <Label check>Büyük</Label>
            </FormGroup>
            {errors.size && <span className="error">{errors.size}</span>}
          </FormGroup>

          <FormGroup>
            <Label for="exampleSelect">Hamur Seç</Label>
            <Input
              id="thickess"
              name="select"
              type="select"
              onChange={e => setThickness(e.target.value)} 
              data-cy="thickness"
            >
              <option>İnce</option>
              <option>Orta</option>
              <option>Kalın</option>
            </Input>
            {errors.thickness && <span className="error">{errors.thickness}</span>}
          </FormGroup>
<FormGroup>
  <div classsName="all-check">
  <div>
          <label>Ek Malzemeler:</label><br />
          <input type="checkbox" id="pepperoni" value="pepperoni" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} data-cy="Pepperoni"/> Pepperoni
          
          <input type="checkbox" id="Sosis" value="Sosis" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} data-cy="Sosis"/> Sosis
          <input type="checkbox" id="Kanada Jambonu" value="Kanada Jambonu" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Kanada Jambonu
          <input type="checkbox" id="Tavuk Izgara" value="Tavuk Izgara" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Tavuk Izgara<br />
          </div>
          <div>
          <input type="checkbox" id="Soğan" value="Soğan" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Soğan
          <input type="checkbox" id="Domates" value="Domates" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Domates
          <input type="checkbox" id="Mısır" value="Mısır" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)}data-cy="Mısır" /> Mısır
          <input type="checkbox" id="Sucuk" value="Sucuk" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)}data-cy="Sucuk" /> Sucuk
          </div>
          <div>
          <input type="checkbox" id="Jalepeno" value="Jalepeno" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Jalepeno
          <input type="checkbox" id="Sarımsak" value="Sarımsak" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Sarımsak<br />
          <input type="checkbox" id="Biber" value="Biber" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Biber
          <input type="checkbox" id="Köz Biber" value="Köz Biber" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Köz Biber
          <input type="checkbox" id="Turşu" value="Turşu" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Turşu<br />
          </div>
          </div>
          {errors.toppings && <span className="error">{errors.toppings}</span>}
          </FormGroup>

          <FormGroup>
            <Label for="Adınız">Adınız</Label>
            <Input
              id="name"
              name="ad"
              placeholder="Adınızı giriniz"
              type="text"
              minLength={3}
              value={name}
              onChange={e => setName(e.target.value)}
              data-cy="name"
            />
              {errors.name && <span className="error">{errors.name}</span>}
          </FormGroup>

          <FormGroup>
            <Label for="notes">Sipariş Notu</Label>
            <Input
              id="textarea"
              name="notes"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              type="textarea"
              value={notes}
              onChange={e => setNotes(e.target.value)} 
              data-cy="textarea"
            />
          </FormGroup>

          <label htmlFor="quantity"></label>
          <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} min="1" /><br></br>

          <label>Seçimler:{toppingsPrice}</label><br></br>
          <label>Toplam Fiyat: {totalPrice} TL</label><br></br>


          <button style={customButtonStyle}type="button" className="siparis" onClick={handleSubmit}>Sipariş Ver</button>
        </form>
      </div>
    </div>
  );
}

export default OrderPage;