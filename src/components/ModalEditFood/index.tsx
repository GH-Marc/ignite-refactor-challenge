import { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

import { FiCheckSquare } from 'react-icons/fi';

interface FoodData {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  available: boolean;
}

type EditFoodSubmit = Omit<FoodData, 'id' | 'available'>;

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: EditFoodSubmit) => Promise<void>;
  editingFood: FoodData;
}

export function ModalEditFood({
  isOpen,
  setIsOpen,
  handleUpdateFood,
  editingFood 
}: ModalProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: FoodData) => {
      handleUpdateFood(data);

      setIsOpen();
    },
    [handleUpdateFood, setIsOpen],
  );

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
