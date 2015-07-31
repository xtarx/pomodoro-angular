-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jul 31, 2015 at 03:55 AM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ang_pomodoro`
--

-- --------------------------------------------------------

--
-- Table structure for table `pomodoros`
--

CREATE TABLE `pomodoros` (
`id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  `info` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pomodoros`
--

INSERT INTO `pomodoros` (`id`, `user_id`, `count`, `info`, `date`, `created_at`) VALUES
(1, 1, 2, NULL, '2015-07-28', '2015-07-29 18:48:18'),
(2, 1, 3, NULL, '2015-07-29', '2015-07-29 18:49:29'),
(3, 1, 2, NULL, '2015-07-30', '2015-07-29 22:24:25'),
(4, 1, 1, NULL, '2015-07-31', '2015-07-30 22:45:29');

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
`id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `done` tinyint(1) NOT NULL DEFAULT '0',
  `add_date` date NOT NULL,
  `done_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `user_id`, `text`, `done`, `add_date`, `done_date`, `created_at`) VALUES
(1, 1, 'ninasdad asdasdas', 1, '2015-07-30', '2015-07-31', '2015-07-30 17:42:28'),
(15, 1, 'amr', 0, '2015-07-31', '0000-00-00', '2015-07-30 22:20:20'),
(17, 1, 'patrick', 1, '2015-07-31', '2015-07-31', '2015-07-30 22:20:23'),
(18, 1, 'asd', 0, '2015-07-31', '0000-00-00', '2015-07-30 22:44:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
`id` int(11) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  `token` varchar(256) NOT NULL,
  `token_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `token`, `token_date`, `created_at`) VALUES
(1, 'admin@echohr.com', '123', 'b06d2ca9832c4501b032724136611dd1', '2015-07-30', '2015-07-29 15:35:50'),
(2, 'amr@echohr.com', '123', '', '0000-00-00', '2015-07-31 01:12:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pomodoros`
--
ALTER TABLE `pomodoros`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pomodoros`
--
ALTER TABLE `pomodoros`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
