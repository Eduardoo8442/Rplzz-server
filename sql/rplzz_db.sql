-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 01/08/2024 às 04:42
-- Versão do servidor: 10.6.18-MariaDB-0ubuntu0.22.04.1
-- Versão do PHP: 8.1.2-1ubuntu2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `rplzz_db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Users`
--

CREATE TABLE `Users` (
  `idUser` bigint(16) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(24) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `Users`
--

INSERT INTO `Users` (`idUser`, `name`, `email`, `password`) VALUES
(52203397620925, 'Eduardo', 'eduardo@gmail.com', '12345678'),
(53576100242669, 'John Doe', 'example@example.com', '$2b$10$SSamHx8rtOaCOW3JZuDYrex2u.p94dzC/wpfOex78EzeVWbruGCyu'),
(58830604701448, 'Eduardo', 'eduardomiau@gmail.com', '$2b$10$aHVHkpCMUqrMcnbgJZ0NcehlNmBpxt3AijhZtAOS3B9rAheiCZRwK'),
(71957516468833, 'sadsklm,', 'Eduafggfgrdo@gmail.com', '$2b$10$1CM6CsbcCaCbZwXMwNgvG.ihCtFQx3TMgIwrzBzLfBAppMW3Tp3lK');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
