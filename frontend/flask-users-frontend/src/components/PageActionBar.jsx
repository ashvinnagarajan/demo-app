import React, { useState } from 'react';
import { Link, Button, Flex } from '@chakra-ui/react';
import {
  ActionBarCloseTrigger,
  ActionBarContent,
  ActionBarRoot,
} from './ui/action-bar';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'Users', path: '/users' },
  { title: 'TBD', path: '/tbd' }
];

const PageActionBar = ({ pageTitle }) => {
  const [checked, setChecked] = useState(true)

  return (
    <ActionBarRoot
      open={checked}
      onOpenChange={(e) => setChecked(e.open)}
      >
      <ActionBarContent>
        <ActionBarCloseTrigger />
        <Flex justify="space-between">
          {pages.map((page, index) => (
            <Link key={index} href={page.path}>
              <Button variant={pageTitle === page.title ? 'solid' : 'ghost'} size="sm">
                {page.title}
              </Button>
            </Link>
          ))}
        </Flex>
      </ActionBarContent>
    </ActionBarRoot>
  );
};

export default PageActionBar;
