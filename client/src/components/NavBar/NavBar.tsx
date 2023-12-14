import { LINK_LIST } from './const';
import { Container, Link } from './styled';
export const NavBar = () => {
  return (
    <Container>
      {LINK_LIST.map((link) => (
        <Link key={link.to} to={link.to}>
          {link.title}
        </Link>
      ))}
    </Container>
  );
};
