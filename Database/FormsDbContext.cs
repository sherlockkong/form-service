using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Npgsql.NameTranslation;
using forms.Database.Models;

namespace forms.Database
{
	public class FormsDbContext : DbContext
	{
		public DbSet<Field> Fields { get; set; }
		public DbSet<FieldData> FieldData { get; set; }
		public DbSet<Form> Forms { get; set; }
		public DbSet<FormData> FormData { get; set; }
		public DbSet<FormHistory> FormHistories { get; set; }
		public DbSet<FormDataHistory> FormDataHistories { get; set; }

		public FormsDbContext(DbContextOptions<FormsDbContext> options) : base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// Field -------------------------------------- //
			modelBuilder.Entity<Field>()
				.HasIndex(x => x.FormId)
				.HasName("Index_Field_FormId");

			modelBuilder.Entity<Field>()
				.HasOne(x => x.Form)
				.WithMany(x => x.Fields)
				.HasForeignKey(x => x.FormId)
				.HasConstraintName("ForeignKey_Field_Form");
			// ------------------------------------------- //

			// FieldData --------------------------------- //
			modelBuilder.Entity<FieldData>()
				.HasIndex(x => x.FormDataId)
				.HasName("Index_FieldData_FormDataId");

			modelBuilder.Entity<FieldData>()
				.HasIndex(x => new { x.FormId, x.FieldId })
				.HasName("Index_FieldData_FormId_And_FieldId");

			modelBuilder.Entity<FieldData>()
				.HasOne(x => x.FormData)
				.WithMany(x => x.FieldDataList)
				.HasForeignKey(x => x.FormDataId)
				.HasConstraintName("ForeignKey_FieldData_FormData");
			// ------------------------------------------- //

			// Form -------------------------------------- //
			modelBuilder.Entity<Form>()
				.HasIndex(x => x.FormId)
				.HasName("Index_Form_FormId")
				.IsUnique(true);
			// ------------------------------------------- //

			// FormData ---------------------------------- //
			modelBuilder.Entity<FormData>()
				.HasIndex(x => x.FormId)
				.HasName("Index_FormData_FormId");

			modelBuilder.Entity<FormData>()
				.HasOne(x => x.Form)
				.WithMany(x => x.FormDataList)
				.HasForeignKey(x => x.FormId)
				.HasConstraintName("ForeignKey_FormData_Form");
			// ------------------------------------------- //

			// FormDataHistory ---------------------------- //
			modelBuilder.Entity<FormDataHistory>()
				.HasIndex(x => x.FormDataId)
				.HasName("Index_FormDataHistory_FormDataId");

			modelBuilder.Entity<FormDataHistory>()
				.HasOne(x => x.FormData)
				.WithMany(x => x.Histories)
				.HasForeignKey(x => x.FormDataId)
				.HasConstraintName("ForeignKey_FormDataHistory_FormData");
			// ------------------------------------------- //

			// FormHistory ------------------------------- //
			modelBuilder.Entity<FormHistory>()
				.HasIndex(x => x.FormId)
				.HasName("Index_FormHistory_FormId");

			modelBuilder.Entity<FormHistory>()
				.HasOne(x => x.Form)
				.WithMany(x => x.Histories)
				.HasForeignKey(x => x.FormId)
				.HasConstraintName("ForeignKey_FormHistory_Form");
			// ------------------------------------------- //
		}
	}
}
