import { Header } from '@/components/header';
import  { ReactNode } from 'react'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
		<>
			<Header />
			{children}
		</>
	);
}
