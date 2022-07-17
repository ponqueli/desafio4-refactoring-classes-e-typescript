import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { SubmitHandler, UnformField } from '@unform/core';

interface Food {
  id: number,
  image: string;
  name: string;
  description: string;
  price: number;
}

interface IModalAddFoodProps {
  isOpen: boolean; 
  setIsOpen: () => void;
  handleAddFood: (food: Food) => void;
}

interface RefObject<T> {
  readonly current: T | null
}

export default function ModalAddFood(props:IModalAddFoodProps) {
  const { isOpen, setIsOpen, handleAddFood } = props;
  const formRef = createRef<any>();

  const handleSubmit: SubmitHandler<UnformField> = async () => {
    const data = formRef.current?.getData();
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
