import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface Food {
  id: number,
  image: string;
  name: string;
  description: string;
  price: number;
}

export default function Dashboard(){
  const [foods, setFoods] = useState<Food[]>([]);
  const [editingFood, setEditingFood] = useState<Food | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get('/foods');
      setFoods(response.data);
    }

    loadFoods();
  }, []);

  async function handleAddFood(food: Food) { 
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: Food) {
    const response = await api.put(`/foods/${food.id}`, {
      ...food,
      available: true,
    });

    const updatedFoods = foods.map(f => {
      if (f.id === food.id) {
        return response.data;
      }

      return f;
    }
    );

    setFoods(updatedFoods);
  }

  async function handleDeleteFood(id:number){
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);
    setFoods(foodsFiltered);
  }

  async function handleEditFood(food:Food){
    
    const response = await api.get(`/foods/${food.id}`);
    setEditingFood(response.data);
    
    setEditModalOpen(true);
  }

  return (
    <>
      <Header setModalOpen={setModalOpen} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        handleAddFood={()=>handleAddFood({
          id: foods.length + 1,
          name: '',
          description: '',
          price: 0,
          image: '',
        })}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={()=>setEditModalOpen(true)}
        editingFood={editingFood}
        handleUpdateFood={()=>handleUpdateFood({
          id: Number(editingFood?.id) | 0,
          image: '',
          name: '',
          description: '',
          price: 0,
          })}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={()=>handleDeleteFood(food.id)}
              handleEditFood={()=>handleEditFood(food)}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

  

  

  