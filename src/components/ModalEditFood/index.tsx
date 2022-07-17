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

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: {}) => void;
  editingFood: {} | undefined;
}

export default function ModalEditFood(props: ModalEditFoodProps) {
  const { isOpen, setIsOpen, handleUpdateFood, editingFood } = props;
  const formRef = createRef<any>();
  const handleSubmit: SubmitHandler<UnformField> = async () => {
    const data = formRef.current?.getData();
    handleUpdateFood(data);
    setIsOpen();
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}


