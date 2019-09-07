-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  sam. 07 sep. 2019 à 11:40
-- Version du serveur :  10.1.36-MariaDB
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `projettest`
--

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

CREATE TABLE `paiement` (
  `id` int(11) NOT NULL,
  `client_phone` varchar(10) NOT NULL,
  `payment_methode` varchar(20) NOT NULL,
  `item_name` varchar(30) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_price` float NOT NULL,
  `ref_commande` varchar(50) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `token` varchar(20) NOT NULL,
  `etat` int(11) NOT NULL DEFAULT '0',
  `date_init` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `paiement`
--

INSERT INTO `paiement` (`id`, `client_phone`, `payment_methode`, `item_name`, `item_id`, `item_price`, `ref_commande`, `currency`, `token`, `etat`, `date_init`) VALUES
(7, '779098765', '', 'farfait2', 2, 156, '1y5GcBqmps', 'XOF', '72a616565c03455252a9', 0, '2019-09-06 23:55:59'),
(8, '778987654', 'wari', 'farfait3', 3, 960, '8SQTIllQOT', 'XOF', 'a5c352ce38b956b11bb4', 1, '2019-09-07 00:09:38'),
(9, '779013878', '', 'farfait2', 2, 156, 'LADXHVT03K', 'XOF', '90ed60cc5e0fd1bd07e1', 0, '2019-09-07 01:35:25'),
(10, '779018746', '', 'farfait2', 2, 156, 'eooShDmdNb', 'XOF', '7aad5e777d3add1bb46b', 0, '2019-09-07 09:07:08'),
(11, '772348765', '', 'farfait3', 3, 960, '50E3HNHJXc', 'XOF', '7dff06f8e2e062becd43', 0, '2019-09-07 09:13:38'),
(12, '776543234', '', 'farfait2', 2, 156, 'HCaWIdNq2T', 'XOF', 'ec93157ec332b251a844', 0, '2019-09-07 09:18:03'),
(13, '778765432', '', 'farfait2', 2, 156, '3BUjtK90R7', 'XOF', 'ac4bfc1c024d90362d64', 0, '2019-09-07 09:18:24'),
(14, '776543212', '', 'farfait3', 3, 960, 'walMSUy2qo', 'XOF', '73fb0ce4fbbf0eda178b', 0, '2019-09-07 09:18:52');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
