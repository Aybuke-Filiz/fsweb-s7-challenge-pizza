import { useState } from 'react'
import './App.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FormGroup, Input, Label } from 'reactstrap';



function App() {
  

  const [name, setName] = useState('');
  const [toppings, setToppings] = useState([]);
  const [size, setSize] = useState('');
  const [thickness, setThickness] = useState('');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const basePrice = 85.50;

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    updateTotalPrice(newQuantity);
  };

  const updateTotalPrice = (quantity) => {
    const basePrice = 85.50; 
    const toppingPrice = 5; 
    const sizePriceMap = {
      small: 85.50,
      medium: 100.50,
      large: 110.50,
    };
    const sizePrice = sizePriceMap[size] || 0;
    const toppingsPrice = toppings.length * toppingPrice;
    const totalPrice = (basePrice + sizePrice + toppingsPrice) * quantity;
    setTotalPrice(totalPrice);
  };

  const handleSubmit = () => {
    if (!name || toppings.length < 4 || !size) {
      console.error('Lütfen tüm gerekli alanları doldurun.');
      return;
    }

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
        console.log('Sipariş bilgileri başarıyla gönderildi.');
        console.log('Sunucu yanıtı:', response.data);
        console.log('Sipariş Özeti:');
        console.log('İsim:', response.data.name);
        console.log('Ek Malzemeler:', response.data.toppings.join(', '));
        console.log('Boyut Seç:', response.data.size);
        console.log('Hamur Seç:', response.data.thickness);
        console.log('Notlar:', response.data.notes);
        console.log('Sipariş Tarihi:', response.data.createdAt);
        console.log('Adet:', response.data.quantity);
        console.log('Toplam Fiyat:', response.data.totalPrice);
      })
      .catch(error => {
        console.error('Sipariş gönderilirken bir hata oluştu:', error);
      });
  };

  return (
    
    <div>
      <h1>Teknolojik Yemekler</h1>
      <h2>Position Absolute Acı Pizza</h2>
      <label> {basePrice} TL</label><br /><br />
      <label>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, quis blanditiis vero dolores quibusdam perspiciatis quisquam amet. Numquam hic ab ducimus quam laudantium dolores perspiciatis quis asperiores eaque modi fugit ad vero quo, quasi placeat, aliquid quidem nulla! Maiores, quae nobis? Vero possimus consequuntur nihil natus voluptatem quod. Eos laudantium at ipsa consequuntur amet blanditiis, vel ea debitis dolorem iste! At quasi aperiam nesciunt iusto eius explicabo molestias cupiditate, animi nemo debitis molestiae eligendi dolore hic mollitia accusamus. Accusantium, tempora ut iste illum consectetur culpa dolores cum officia magnam at. Deleniti, excepturi voluptates? Eaque aliquid adipisci mollitia, quam cupiditate cum?</label>
      <form>
      <FormGroup tag="fieldset">
    <legend>
      Boyut Seç
    </legend>
      <FormGroup check>
      <Input
        name="size"
        type="radio"
        value="small"
        checked={size === 'small'}
        onChange={() => setSize('small')} 
      />
      {' '}
      <Label check>
        Küçük
      </Label>
    </FormGroup>
    <FormGroup check>
      <Input
        name="size"
        type="radio"
        value="medium"
        checked={size === 'medium'}
        onChange={() => setSize('medium')} 
      />
      {' '}
      <Label check>
        Orta
      </Label>
</FormGroup>
<FormGroup check>
      <Input
        name="size"
        type="radio"
        value="large"
        checked={size === 'large'}
        onChange={() => setSize('Büyük')} 
      />
      {' '}
      <Label check>
        Büyük
      </Label>
</FormGroup>
    </FormGroup>

        <FormGroup>
    <Label for="exampleSelect">
      Hamur Seç
    </Label>
    <Input
      id="exampleSelect"
      name="select"
      type="select"
    >
      <option>
        İnce
      </option>
      <option>
        Orta
      </option>
      <option>
        Kalın
      </option>
    </Input>
  </FormGroup>

        <label>Ek Malzemeler:</label><br />
        <input type="checkbox" id="pepperoni" value="pepperoni" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Pepperoni<br />
        <input type="checkbox" id="Sosis" value="Sosis" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Sosis<br />
        <input type="checkbox" id="Kanada Jambonu" value="Kanada Jambonu" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Kanada Jambonu<br />
        <input type="checkbox" id="Tavuk Izgara" value="Tavuk Izgara" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Tavuk Izgara<br />
        <input type="checkbox" id="Soğan" value="Soğan" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Soğan<br /><br />
        <input type="checkbox" id="Domates" value="Domates" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Domates<br /><br />
        <input type="checkbox" id="Mısır" value="Mısır" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Mısır<br /><br />
        <input type="checkbox" id="Sucuk" value="Sucuk" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Sucuk<br /><br />
        <input type="checkbox" id="Jalepeno" value="Jalepeno" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Jalepeno<br /><br />
        <input type="checkbox" id="Sarımsak" value="Sarımsak" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Sarımsak<br /><br />
        <input type="checkbox" id="Biber" value="Biber" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Biber<br /><br />
        <input type="checkbox" id="Sucuk" value="Sucuk" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Sucuk<br /><br />
        <input type="checkbox" id="Köz Biber" value="Köz Biber" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Köz Biber<br /><br />
        <input type="checkbox" id="Turşu" value="Turşu" onChange={e => setToppings(prevToppings => e.target.checked ? [...prevToppings, e.target.value] : prevToppings)} /> Turşu<br /><br />
        <FormGroup>
    <Label for="Adınız">
      Adınız
    </Label>
    <Input
      id="name"
      name="ad"
      placeholder="Adınızı giriniz"
      type="text"
      minLength={3}
      value={name}
      onChange={e => setName(e.target.value)}
    />
     </FormGroup>
     <FormGroup>
    <Label for="notes">
      Sipariş Notu
    </Label>
    <Input
      id="notes"
      name="notes"
      placeholder="Siparişine eklemek istediğin bir not var mı?"
      type="textarea"
      value={notes}
      onChange={e => setNotes(e.target.value)} 
      
    />
     </FormGroup>

       
        <label htmlFor="quantity">Adet:</label>
        <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} min="1" /><br /><br />

        <label>Toplam Fiyat: {totalPrice} TL</label><br /><br />

        <button type="button" onClick={handleSubmit}>Sipariş Ver</button>
      </form>
    </div>
  );
}


export default App
