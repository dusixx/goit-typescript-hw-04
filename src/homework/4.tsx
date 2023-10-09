import noop from 'lodash/noop';
import {
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';

//
// Types
//

type MenuIds = 'first' | 'second' | 'last';
type Menu = { id: MenuIds; title: string };

// Додати тип MenuSelected
type SelectedMenu = { id: MenuIds };
type MenuSelected = { selectedMenu: SelectedMenu };

// Додайте тип MenuAction
type MenuAction = {
  onSelectedMenu: Dispatch<SetStateAction<SelectedMenu>>;
};

// Додати тип для children
type PropsProvider = {
  children: ReactNode;
};

// Додайте вірний тип для меню
type PropsMenu = {
  menus: Menu[];
};

//
// Main
//

const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: { id: 'first' },
});

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

function MenuProvider({ children }: PropsProvider) {
  // Додати тип для SelectedMenu він повинен містити { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({
    id: 'first',
  });

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map(menu => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{' '}
          {selectedMenu.id === menu.id ? 'Selected' : 'Not selected'}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: 'first',
      title: 'first',
    },
    {
      id: 'second',
      title: 'second',
    },
    {
      id: 'last',
      title: 'last',
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
