import { useRef, useCallback } from 'react';

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

type AddFoodSubmit = Omit<FoodData, 'id' | 'available'>;

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: AddFoodSubmit) => Promise<void>;
}

export function ModalAddFood({ isOpen, setIsOpen, handleAddFood }: ModalProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: FoodData) => {
      handleAddFood(data);

      setIsOpen();
    },
    [handleAddFood, setIsOpen],
  );

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
