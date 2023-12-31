import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { expect, vi } from "vitest";
import Login from ".";

describe('Teste do componente Login', () => {
  
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  test('deve renderizar o texto Iniciar Sessão', () => {
    const texto = screen.getByText(/Iniciar Sessão/i);
    expect(texto).toBeInTheDocument();
  });

  test('deve renderizar o texto Ainda não tem conta?', () => {
    const texto = screen.getByText(/Ainda não tem conta?/i);
    expect(texto).toBeInTheDocument();
  });

  test('deve renderizar o texto Registre-se', () => {
    const texto = screen.getByText(/Registre-se/i);
    expect(texto).toBeInTheDocument();
  });

  test('deve renderizar o botão Entrar', () => {
    const botao = screen.getByRole('button', { name: /Entrar/i });
    expect(botao).toBeInTheDocument();
  });
test('deve chamar a função onClick quando o botão Entrar for clicado', async () => {
  window.alert = vi.fn();
  await userEvent.click(screen.getByRole('button', { name: /Entrar/i })); 

  expect(window.alert).toHaveBeenCalledWith('Por favor, tente novamente, suas credenciais são inválidas');

 
});
});