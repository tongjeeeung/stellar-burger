import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearIngredient,
  getBun,
  getIngredients
} from '../../services/constructorBurgerSlice';
import { getUser } from '../../services/userSlice';
import {
  clearData,
  getOrderModalData,
  getOrderRequest,
  orderBurgerThunk
} from '../../services/ordersSlice';
import { useNavigate } from 'react-router';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = {
    bun: useSelector(getBun),
    ingredients: useSelector(getIngredients)
  };

  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) return navigate('/register');

    dispatch(
      orderBurgerThunk([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ing: TIngredient) => ing._id),
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearData());
    dispatch(clearIngredient());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
