package com.demo.Entities;

import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "work")
@Setter
@Getter
@NoArgsConstructor
public class Course_cards extends BaseEntity {

	@Column(name = "title", length = 100, nullable = false)
	private String title;

	@Column(length = 10000, nullable = false)
	private String description;

	@Column
	private String image;

	@Column(name = "budget", nullable = false)
	private String budget;

	@Column(name = "status")
	private boolean status;
	
	@Column(name="Trainer name")
	private String name;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
}
