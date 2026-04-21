# Exam Rank 02 — Level 4 — codes rendus

7 exos sur 10 validés. Les 3 manquants (`flood_fill`, `ft_list_remove_if`, `ft_split`) ne sont pas encore rendus.

**Sommaire**
- [fprime](#fprime)
- [ft_itoa](#ft_itoa)
- [ft_list_foreach](#ft_list_foreach)
- [rev_wstr](#rev_wstr)
- [rostring](#rostring)
- [sort_int_tab](#sort_int_tab)
- [sort_list](#sort_list)

---

## fprime

> Programme qui prend un int positif et affiche ses facteurs premiers dans l'ordre croissant, séparés par `*`. Si pas 1 seul argument → juste `\n`.
> Allowed : `printf`, `atoi`.

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
	if (argc != 2)
	{
		printf("\n");
		return 0;
	}
	int n = atoi(argv[1]);
	if (n == 1)
	{
		printf("1\n");
		return 0;
	}
	int div = 2;
	while (n > 1)
	{
		if (n % div == 0)
		{
			printf("%d", div);
			n /= div;
			if (n > 1)
				printf("*");
		}
		else
			div++;
	}
	printf("\n");
	return 0;
}
```

---

## ft_itoa

> Convertit un int en string null-terminée, allouée avec malloc. Doit gérer `INT_MIN`.
> Allowed : `malloc`.

```c
#include <stdlib.h>

char	*ft_itoa(int nbr)
{
	char	*result;
	long	n;
	long	tmp;
	int		len;
	int		signe;
	int		i;

	len = 1;
	signe = 1;
	n = nbr;
	if (nbr == 0)
	{
		result = malloc(2);
		if (!result)
			return (NULL);
		result[0] = '0';
		result[1] = '\0';
		return (result);
	}
	if (n < 0)
	{
		signe = -1;
		n = -n;
		len += 1;
	}
	tmp = n;
	while (tmp >= 10)
	{
		len++;
		tmp /= 10;
	}
	result = malloc(len + 1);
	if (!result)
		return (NULL);

	result[len] = '\0';
	i = len - 1;
	while (n > 0)
	{
		result[i--] = n % 10 + '0';
		n /= 10;
	}

	if (signe == -1)
		result[0] = '-';
	return (result);
}
```

---

## ft_list_foreach

> Applique une fonction à chaque élément d'une liste chaînée.
> Allowed : aucune.

**ft_list_foreach.c**

```c
#include "ft_list.h"

void	ft_list_foreach(t_list *begin_list, void (*f)(void *))
{
	while (begin_list)
	{
		f(begin_list->data);
		begin_list = begin_list->next;
	}
}
```

**ft_list.h**

```c
typedef struct	s_list
{
	struct s_list	*next;
	void			*data;
}	t_list;

void	ft_list_foreach(t_list *begin_list, void (*f)(void *));
```

---

## rev_wstr

> Affiche les mots d'un string en ordre inverse. Si argc != 2 → `\n`.
> Allowed : `write`, `malloc`, `free`.

```c
#include <unistd.h>

int	main(int argc, char **argv)
{
	char	*str = argv[1];
	int		i = 0;
	int		end = 0;

	if (argc != 2)
	{
		write(1, "\n", 1);
		return (0);
	}
	while (str[i])
		i++;
	i--;
	while (i >= 0)
	{
		end = i;
		while (i >= 0 && str[i] != ' ' && str[i] != '\t')
			i--;
		write(1, &str[i + 1], end - i);
		if (i >= 0)
			write(1, " ", 1);
		i--;
	}
	write(1, "\n", 1);
	return (0);
}
```

---

## rostring

> Rotation d'un mot vers la gauche : premier mot devient le dernier, ordre préservé, séparateurs normalisés à un seul espace.
> Allowed : `write`, `malloc`, `free`.

```c
#include <unistd.h>

int	main(int argc, char **argv)
{
	int		i = 0;
	char	*str;
	int		start;
	int		end;
	int		w_start;
	int		printed = 0;

	if (argc < 2)
	{
		write(1, "\n", 1);
		return (0);
	}
	str = argv[1];
	while (str[i] == ' ' || str[i] == '\t')
		i++;
	start = i;
	while (str[i] && str[i] != ' ' && str[i] != '\t')
		i++;
	end = i;
	while (str[i])
	{
		while (str[i] == ' ' || str[i] == '\t')
			i++;
		if (str[i])
		{
			if (printed)
				write(1, " ", 1);
			w_start = i;
			while (str[i] && str[i] != ' ' && str[i] != '\t')
				i++;
			write(1, &str[w_start], i - w_start);
			printed = 1;
		}
	}
	if (printed)
		write(1, " ", 1);
	write(1, &str[start], end - start);
	write(1, "\n", 1);
	return (0);
}
```

---

## sort_int_tab

> Trie in-place un `int *tab` de taille `unsigned int size` en ordre croissant. Doubles préservés. Algo : bubble sort.
> Allowed : aucune.

```c
void	sort_int_tab(int *tab, unsigned int size)
{
	unsigned int	i;
	int				tmp;
	int				swaped;

	if (size < 2)
		return ;
	swaped = 1;
	while (swaped)
	{
		swaped = 0;
		i = 0;
		while (i < size - 1)
		{
			if (tab[i] > tab[i + 1])
			{
				tmp = tab[i];
				tab[i] = tab[i + 1];
				tab[i + 1] = tmp;
				swaped = 1;
			}
			i++;
		}
	}
}
```

Note : `size` est `unsigned` → si `size == 0`, alors `size - 1` underflow à `UINT_MAX`. Le guard `if (size < 2)` bloque ça.

---

## sort_list

> Trie une liste chaînée via un pointeur de fonction `cmp`. `cmp` retourne != 0 si dans le bon ordre, 0 sinon. Bubble sort sur les `data`, on ne reliste pas les noeuds.
> Allowed : aucune.

```c
#include "list.h"

t_list *sort_list(t_list *lst, int (*cmp)(int, int))
{
	if (!lst || !lst->next)
		return (lst);
	int swapped = 1;
	t_list *cur;
	int tmp;
	while (swapped)
	{
		swapped = 0;
		cur = lst;
		while (cur->next)
		{
			if (!cmp(cur->data, cur->next->data))
			{
				tmp = cur->data;
				cur->data = cur->next->data;
				cur->next->data = tmp;
				swapped = 1;
			}
			cur = cur->next;
		}
	}
	return (lst);
}
```

Note : `list.h` n'est pas à rendre (fourni par 42), il contient juste le `typedef struct s_list`.
