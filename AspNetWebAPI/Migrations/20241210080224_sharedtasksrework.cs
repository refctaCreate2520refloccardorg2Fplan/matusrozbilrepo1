using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class sharedtasksrework : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SharedTasksUser_AspNetUsers_UserId",
                table: "SharedTasksUser");

            migrationBuilder.DropForeignKey(
                name: "FK_SharedTasksUser_SharedTask_SharedTasksId",
                table: "SharedTasksUser");

            migrationBuilder.DropTable(
                name: "SharedTask");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SharedTasksUser",
                table: "SharedTasksUser");

            migrationBuilder.DropIndex(
                name: "IX_SharedTasksUser_SharedTasksId",
                table: "SharedTasksUser");

            migrationBuilder.DropIndex(
                name: "IX_SharedTasksUser_UserId",
                table: "SharedTasksUser");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "SharedTasksUser");

            migrationBuilder.DropColumn(
                name: "SharedTasksId",
                table: "SharedTasksUser");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "SharedTasksUser",
                newName: "UserID");

            migrationBuilder.AddColumn<bool>(
                name: "IsShared",
                table: "Tasks",
                type: "bit",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SharedTasksUser",
                table: "SharedTasksUser",
                columns: new[] { "TasksId", "UserID" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SharedTasksUser",
                table: "SharedTasksUser");

            migrationBuilder.DropColumn(
                name: "IsShared",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "SharedTasksUser",
                newName: "UserId");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "SharedTasksUser",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "SharedTasksId",
                table: "SharedTasksUser",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SharedTasksUser",
                table: "SharedTasksUser",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "SharedTask",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deadline = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDone = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Priority = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SharedTask", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SharedTasksUser_SharedTasksId",
                table: "SharedTasksUser",
                column: "SharedTasksId");

            migrationBuilder.CreateIndex(
                name: "IX_SharedTasksUser_UserId",
                table: "SharedTasksUser",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_SharedTasksUser_AspNetUsers_UserId",
                table: "SharedTasksUser",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SharedTasksUser_SharedTask_SharedTasksId",
                table: "SharedTasksUser",
                column: "SharedTasksId",
                principalTable: "SharedTask",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
