import React, { useState } from 'react';
import { Link, Button, HStack } from '@chakra-ui/react';
import {
  ActionBarCloseTrigger,
  ActionBarContent,
  ActionBarRoot,
} from './ui/action-bar';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'Users', path: '/users' },
  { title: 'Product', path: '/product' }
];

const PageActionBar = ({ pageTitle }) => {
  const [checked, setChecked] = useState(true)

  return (
    <ActionBarRoot
      open={checked}
      onOpenChange={(e) => setChecked(e.open)}
      closeOnInteractOutside={false}
      >
      <ActionBarContent>
        <ActionBarCloseTrigger />
        <HStack gap="2">
          {pages.map((page, index) => (
            <Link key={index} href={page.path}>
              <Button variant={pageTitle === page.title ? 'solid' : 'surface'} size="sm">
                {page.title}
              </Button>
            </Link>
          ))}
        </HStack>
      </ActionBarContent>
    </ActionBarRoot>
  );
};

export default PageActionBar;
