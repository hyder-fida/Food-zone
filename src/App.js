import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResults from './componenets/searchResults/SearchResults';
export const BASE_URL = "http://localhost:9000"


function App() {
   const [data, setData] = useState(null);
   const [filteredData, setFilteredData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [selectedBtn, setSelectedbtn]  = useState("all");
   
   useEffect(() => {
    const fetchFoodData =  async () => {
      setLoading(true);

     try {
       const response = await fetch(BASE_URL);
       const json = await response.json();
 
       setData(json);
       setFilteredData(json);
       setLoading(false);
 
     } catch(error) {
          setError("unable to fetch data");
     }
    };
    fetchFoodData();
   },[]);

   const filterFood = (type) => {
     if(type == "all"){
        setFilteredData(data);
        setSelectedbtn("all");
        return;
     }
     const filter = data?. filter((food) => food.type.toLowerCase().includes(type.toLowerCase())
     );
     setFilteredData(filter);
     setSelectedbtn(type);
   };

   const filteredBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "BreakFast",
      type: "breakFast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
    {
      name: "MidNight",
      type: "midNight",
    },
   ] 
  
  

   const searchFood = (e) => {
      const searchValue = e.target.value;
      console.log(searchValue);

      if(searchValue === ""){
         setFilteredData(null);
      }

      const filter = data?. filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filter);
   }
  

    if(error) return <div>{error}</div>
    if(loading) return <div>loading...</div>

  return (
    <>
      <Container className="">
      <TopContainer className="">
         <div className='logo'>
           <img src="/FoodyZone.svg"  alt="logo" />
         </div>   
         <div className='search'>
           <input onChange={searchFood} placeholder='Search Food...'/>   
      </div>   
      </TopContainer>
      <FilterContainer>
          {filteredBtns.map((value) => (
            <Button
            isSelected = {selectedBtn === value.type}
             key={value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>

          ))}
      </FilterContainer>
    </Container>
    <SearchResults data = {filteredData}/>
    </>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin:0;
`;

const TopContainer = styled.div`
   height: 110px;
   display: flex;
   justify-content: space-between;
   padding: 16px;
   align-items: center;

   .search{
     input{
      background-color: transparent;
      border: 1px solid red;
      color: white;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      border-radius: 20px;
      &::placeholder{
        color: white;

      }
     }
   }

   @media (0 < width < 600px){
     flex-direction: column;
     height: 90px;
     
   }
`;
const FilterContainer = styled.div`
   display: flex;
   justify-content: center;
   gap: 12px;
   padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({isSelected}) => (isSelected ? "#f22f2f" : "#ff4343")} ;
  outline: 1px solid ${({isSelected}) => (isSelected ? "white" : "#ff4343")} ;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: #f22f2f;
  }
  @media (0 < width < 600px){
     margin-top: 10px;
     
   }

`;

